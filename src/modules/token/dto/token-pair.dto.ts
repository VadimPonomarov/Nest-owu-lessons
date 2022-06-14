import {ApiProperty} from "@nestjs/swagger";

export class TokenPairDto {
    @ApiProperty({
        type: String,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmFkaW0iLCJlbWFpbCI6ImZkcmRxMjIxZ2hAZ21haWwuY29tIiwiaWF0IjoxNjU1MjE2MTQyLCJleHAiOjE2NTc4MDgxNDJ9.3KZOsX-T3SUUyvkvuW0tWjxi4EpjobVTlOcFxYpR9BA',
        uniqueItems: true,
        description: 'JWT-Token'
    })
    accessToken: string;

    @ApiProperty({
        type: String,
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmFkaW0iLCJlbWFpbCI6ImZkcmRxMjIxZ2hAZ21haWwuY29tIiwiaWF0IjoxNjU1MjE2MTQyLCJleHAiOjE2NTc4MDgxNDJ9.3KZOsX-T3SUUyvkvuW0tWjxi4EpjobVTlOcFxYpR9BA',
        uniqueItems: true,
        description: 'JWT-Token'
    })
    refreshToken: string;
}