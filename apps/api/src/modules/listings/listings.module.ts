import { Module } from '@nestjs/common';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { ListingsExpiryService } from './listings-expiry.service';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService, ListingsExpiryService],
})
export class ListingsModule {}
