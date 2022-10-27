import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 8182 })
  url: string;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 120 })
  reason: string;

  @Column({ length: 32 })
  referee: string;

  @Column({ length: 20 })
  category: string;

  @Column('tinyint', { default: 0 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
