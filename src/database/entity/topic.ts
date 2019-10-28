import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';

import Post from './post';

@Entity({ name: 'topics' })
class Topic {
  @PrimaryColumn()
  name: string;

  @ManyToMany(type => Post, post => post.topics)
  posts: Post[];
}

export default Topic;
