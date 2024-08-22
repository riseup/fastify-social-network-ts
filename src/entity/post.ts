import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user';
import { Like } from './like';
import { Comment } from './comment';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({type: 'text'})
  content: string = ''

  @CreateDateColumn()
  post_date!: Date;

  @ManyToOne(() => User, user => user.posts)
  user!: User;

  @OneToMany(() => Like, like => like.post)
  likes!: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment[];
}