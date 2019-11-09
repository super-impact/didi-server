import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Post from './post';
import User from './user';

@Entity({ name: 'post_likes' })
class PostLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Post, post => post.id)
  @JoinColumn({ name: 'fk_post_id' })
  post: Post;

  @ManyToOne(type => User, user => user.id)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default PostLike;
