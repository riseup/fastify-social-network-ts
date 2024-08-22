import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Post } from './post';
import { Like } from './like';
import { Comment } from './comment';
import { Follow } from './follow';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: 'varchar', length: 255})
  name!: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @OneToMany(() => Post, post => post.user)
  posts!: Post[];

  @OneToMany(() => Follow, follow => follow.follower)
  following!: Follow[];

  @OneToMany(() => Follow, follow => follow.followed)
  followers!: Follow[];

  @OneToMany(() => Like, like => like.user)
  likes!: Like[];

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];
}