import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "enum/user.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({example: 1, description: 'The Unique identifier of the user'})
    id: number;


    @Column({unique: true})
    @ApiProperty({example: "user@school.ma", description: 'The unique email of user'})
    email:string;


    @Column()
    password: string;

    @Column()
    @ApiProperty({example: 'Ahmed ali', description: 'The Full name of the User'})
    name: string;


    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STUDENT,
    })
    @ApiProperty({example: "Student", enum: UserRole, description: 'The role/permission of the User'})
    role: UserRole;


    @CreateDateColumn()
    @ApiProperty({description: 'The date when the account was created!'})
    createdAt: Date;
}
