import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Posts as PostsEntity } from './posts.entity';

export interface IPostsRo {
  list: PostsEntity[];
  total: number;
}

@Injectable()
export class PostsService {
  private postsRepository: Repository<PostsEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.postsRepository = dataSource.getRepository(PostsEntity);
  }

  // 创建文章
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { url } = post;
    // if (this.postsRepository.hasId(post)) {

    // }

    const doc = await this.postsRepository.findOne({ where: { url } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }

    return await this.postsRepository.save(post);
  }

  // 获取文章列表
  async findAll(query): Promise<IPostsRo> {
    const qb = await this.dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');

    const total = await qb.getCount();
    const { pageNum = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));

    const posts = await qb.getMany();
    return { list: posts, total };
  }

  // 获取指定文章
  async findById(id): Promise<PostsEntity> {
    return await this.postsRepository.findOneBy({ id });
  }

  // 更新文章
  async updateById(id, post): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.postsRepository.remove(existPost);
  }
}
