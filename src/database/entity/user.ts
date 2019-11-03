import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import Post from './post';

@Entity({ name: 'users' })
@Unique(['email'])
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'salt', nullable: true })
  salt?: string;

  @Column({ name: 'hash', nullable: true })
  hash?: string;

  @Column({ name: 'display_name' })
  displayName: string;

  @Column({ name: 'profile_image_url' })
  profileImageUrl: string;

  @Column({ name: 'provider' })
  provider: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(type => Post, post => post.contributorUser, { cascade: true })
  posts: Post[];
}

export default User;
