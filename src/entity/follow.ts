import { Entity, PrimaryColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Follow {
  @PrimaryColumn()
  followerId!: number;

  @PrimaryColumn()
  followedId!: number;

  @CreateDateColumn()
  follow_date!: Date;

  @ManyToOne(() => User, user => user.following)
  follower!: User;

  @ManyToOne(() => User, user => user.followers)
  followed!: User;
}