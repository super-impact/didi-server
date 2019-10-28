import { Arg, Mutation, Query, Resolver } from 'type-graphql';

import { NewTestInput, Test } from './test.type';

// TODO(hoon): 서비스 API가 정의되면 삭제될 예정
@Resolver(Test)
class TestResolver {
  @Query(returns => [Test])
  async tests() {
    const tests = [
      {
        id: 'a-1',
        title: 'title',
        description: 'description',
        creationDate: '2019-10-09',
      },
    ];

    return tests;
  }

  @Query(retunrs => Test)
  async test(@Arg('id') id: string) {
    console.log('id: ', id);

    const test = {
      id: 'a-1',
      title: 'title',
      description: 'description',
      creationDate: '2019-10-09',
    };

    return test;
  }

  @Mutation(returns => Test)
  async addTest(@Arg('newTest') newTest: NewTestInput): Promise<Test> {
    const test = {
      id: 'a-2',
      title: 'title',
      description: 'description',
      creationDate: '2019-10-09',
    };

    return test;
  }

  @Mutation(returns => Test)
  async removeTest(@Arg('id') id: string): Promise<boolean> {
    return true;
  }
}

export default TestResolver;
