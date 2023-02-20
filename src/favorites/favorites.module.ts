import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
