import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  email!: string

  @Column()
  username!: string

  @Column()
  password!: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date
}
