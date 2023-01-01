import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  channel_id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  message_id: string;

  @Column({ type: 'varchar' })
  channel: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar' })
  message_color: string;

  @Column({ type: 'boolean' })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true, default: null })
  updated_at: Date | null;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date | null;
}
