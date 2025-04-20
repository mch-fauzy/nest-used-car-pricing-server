// import { createZodDto } from 'nestjs-zod';
// import { Expose } from 'class-transformer';

// import { createStudioSchema } from './create-studio.dto';
// import { studioByIdSchema } from './studio-by-id.dto';

// const updateStudioSchema = studioByIdSchema.merge(createStudioSchema.partial())
//   .refine((data) => {
//     const { id, ...rest } = data;
//     Object.keys(rest).length > 0
//   }, {
//     message: 'At least one field must be provided',
//   }
//   );

// export class UpdateStudioDto extends createZodDto(updateStudioSchema) {
//   @Expose()
//   studioNumber: number;

//   @Expose()
//   seatCapacity: number;
// }
