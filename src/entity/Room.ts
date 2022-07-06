import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
