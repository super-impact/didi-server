import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import Post from './post';
import PostLike from './postLike';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password_salt', nullable: true })
  passwordSalt?: string;

  @Column({ name: 'password_hash', nullable: true })
  passwordHash?: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'profile_image_url', default: 'default_profile_image' })
  profileImageUrl: string;

  @Column({ name: 'provider' })
  provider: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    type => Post,
    post => post.contributorUser,
    { cascade: true },
  )
  posts: Post[];

  @OneToMany(
    type => PostLike,
    postLike => postLike.user,
    { cascade: true },
  )
  postLikes: PostLike[];
}

export default User;
