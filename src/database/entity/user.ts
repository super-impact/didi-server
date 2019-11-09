import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import Post from './post';
import PostLike from './postLike';

@Entity({ name: 'users' })
@Unique(['email'])
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'profile_image_url' })
  profileImageUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'auth_type' })
  authType: string;

  @OneToMany(type => Post, post => post.contributorUser, { cascade: true })
  posts: Post[];

  @OneToMany(type => PostLike, postLike => postLike.user, { cascade: true })
  postLikes: PostLike[];
}

export default User;
