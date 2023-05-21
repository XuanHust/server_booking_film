import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { GetReviewDto } from './dto/get-review.dto'
import { AccessTokenGuard } from 'src/guards'

@Controller({
  path: '/reviews',
  version: '1'
})
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto)
  }

  @Get()
  // @UseGuards(AccessTokenGuard)
  findAll(@Query() query: GetReviewDto) {
    return this.reviewsService.findAll(query)
  }

  @Get(':id')
  // @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto)
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id)
  }
}
