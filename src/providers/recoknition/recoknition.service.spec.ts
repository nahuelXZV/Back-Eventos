import { Test, TestingModule } from '@nestjs/testing';
import { RecoknitionService } from './recoknition.service';

describe('RecoknitionService', () => {
  let service: RecoknitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecoknitionService],
    }).compile();

    service = module.get<RecoknitionService>(RecoknitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
