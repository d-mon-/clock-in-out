import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';

describe('AuthController', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`should generate an access_token`, async () => {
    const email = 'test-' + Date.now() + '@test.com';
    const userService = moduleFixture.get(UsersService);
    await userService.create({
      email,
      firstName: 'fn',
      lastName: 'ln',
      password: 'password',
    });

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password: 'password' })
      .expect(200)
      .expect((res) => {
        return expect(res.body.access_token.length).toBeGreaterThan(100);
      });
  });
});
