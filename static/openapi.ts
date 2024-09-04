#!/usr/bin/env node

import * as fs from 'fs/promises';
import * as path from 'path';
import { exec } from 'child_process';
import { app } from '../src/core/app';

let branch: string = 'develop';
const hashCommand: string = 'git log -1 --pretty=format:"%h"';
const branchCommand: string = 'git rev-parse --abbrev-ref HEAD';
main();

async function main(): Promise<void> {
  try {
    // Obtener el nombre de la rama actual
    const branchOut = await execProm(branchCommand);
    branch = branchOut.stdout;

    // Obtener el hash de la última confirmación
    const commitHash = await execProm(hashCommand);
    let revision: string = branch;
    if (!commitHash.stderr) {
      revision += '_' + commitHash.stdout;
    }

    // Escribir la revisión en un archivo JSON
    await fs.writeFile(path.join(__dirname, 'revision.json'), JSON.stringify(revision));

    // Iniciar la aplicación Fastify
    const server = await app();
    await server.ready();

    // Escribir la especificación OpenAPI en un archivo JSON
    await fs.writeFile(path.join(__dirname, 'openapi.json'), JSON.stringify(server.swagger(), null, 2));

    // Cerrar la aplicación Fastify
    await server.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(2);
  }
}

function execProm(cmd: string): Promise<{ stdout: string, stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout: stdout.trim(), stderr });
    });
  });
}