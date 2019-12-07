import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import PostLike from './postLike';
import Topic from './topic';
import User from './user';

@Entity({ name: 'posts' })
@Unique(['contentLink'])
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'content_link', unique: true })
  contentLink: string;

  @Column({ name: 'thumbnail_image_url' })
  thumbnailImageUrl: string;

  @Column({ name: 'content_maker_email' })
  contentMakerEmail: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @JoinColumn({ name: 'fk_contributor_user_id' })
  contributorUser: User;

  @ManyToMany(
    type => Topic,
    topic => topic.name,
  )
  @JoinTable({ name: 'posts_topics' })
  topics: Topic[];

  @OneToMany(
    type => PostLike,
    postLike => postLike.post,
    { cascade: true },
  )
  postLikes: PostLike[];
}

export default Post;
