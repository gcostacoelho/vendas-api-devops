import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class UserEntity{
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'email', nullable: false})
    email: string;

    @Column({name: 'password', nullable: false})
    password: string;

    @Column({name: 'phone'})
    phone: string;

    @Column({name: 'cpf', nullable: false})
    cpf: string;

    @Column({name: 'type_user', nullable: false})
    typeUser: number;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @CreateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}