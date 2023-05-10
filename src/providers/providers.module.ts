import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { HttpCustomService } from './http/http.service';
import { S3Service } from './s3/s3.service';
import { RecoknitionService } from './recoknition/recoknition.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpCustomService, S3Service, RecoknitionService],
  exports: [HttpCustomService, HttpModule, S3Service],
})
export class ProvidersModule { }
