import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  Get,
  Param,
  Patch,
  Delete,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decarator';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateUsertDto } from './dto/update-user.dto';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly userSerice: UsersService) {}

  @Get()
  async getAll() {
    return await this.userSerice.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userSerice.getOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Patch(':id')
  async update(
    @Body() body: UpdateUsertDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updatedUser = await this.userSerice.update(body, id);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const deletedUser = await this.userSerice.remove(id);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userSerice.remove(id);
  }
}
