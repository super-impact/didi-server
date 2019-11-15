import DataLoader = require('dataloader');
import { groupBy } from 'lodash';
import { Service } from 'typedi';

import { PostService } from '../../service';

@Service()
export default class PostDataLoader {
  public postLikeCountLoader: DataLoader<string, number>;

  constructor(private postService: PostService) {
    this.postLikeCountLoader = new DataLoader(this.getPostLikeCountByIds);
  }

  private getPostLikeCountByIds = async (postIds: string[]) => {
    const postLikes = await this.postService.getPostLikeCountByIds(postIds);

    const likes = groupBy(postLikes, 'post.id');

    return postIds.map(postId => {
      return Array.isArray(likes[postId]) ? likes[postId].length : 0;
    });
  };
}
