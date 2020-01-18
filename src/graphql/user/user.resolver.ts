import { Args, Authorized, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { PostLikeRepository } from '../../database/repository';
import { ContextType } from '../../middlewares/auth.mididleware';
import { UserService } from '../../service';
import { User, UserArgs } from './user.type';

@Resolver(User)
@Service()
class UserResolver {
  constructor(
    private userService: UserService,
    @InjectRepository() private readonly postLikeRepository: PostLikeRepository,
  ) {}

  @Query(returns => User)
  async user(@Args() userArgs: UserArgs) {
    const { id } = userArgs;

    return this.userService.getUser({ id });
  }

  @Authorized()
  @Query(returns => User)
  async myUser(@Ctx() context: ContextType) {
    const { id } = context.token;

    return this.userService.getUser({ id });
  }

  @FieldResolver()
  async likeCount(@Root() root: User) {
    return this.postLikeRepository.getLikeCountByUser({ id: root.id });
  }

  @FieldResolver()
  async likePosts(@Root() root: User) {
    return await this.userService.getLikePosts({ id: root.id });
  }
}

export default UserResolver;
