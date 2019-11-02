import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PostRepository } from '../database/repository';

@Service()
class PostService {
  constructor(@InjectRepository() private readonly postRepository: PostRepository) {}

  public async getPosts({ take, skip }: { take: number; skip: number }) {
    return this.postRepository.getPosts({ take, skip });
  }
}

export default PostService;
