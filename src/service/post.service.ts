import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PostRepository } from '../database/repository';
import { Post } from '../graphql/post/post.type';

@Service()
class PostService {
  constructor(@InjectRepository() private readonly postRepository: PostRepository) {}

  public async getPosts({ take, skip }: { take: number; skip: number }) {
    return this.postRepository.getPosts({ take, skip });
  }

  public async getPost({ id }: Partial<Post>) {
    return this.postRepository.getPostById(id);
  }
}

export default PostService;
