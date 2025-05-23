import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserType } from './entities/user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    password: 'hashedpassword',
    type: UserType.USER,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepo = {
    findOne: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by email', async () => {
    const user = await service.findByEmail('test@example.com');
    expect(user).toEqual(mockUser);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });

  it('should create a new user', async () => {
    (repo.findOne as jest.Mock).mockResolvedValueOnce(undefined);
    const user = await service.create('test@example.com', 'password', 'Test', 'User', UserType.USER);
    expect(user).toEqual(mockUser);
    expect(repo.save).toHaveBeenCalled();
  });
}); 