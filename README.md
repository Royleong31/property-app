To reproduce the issue:

run:

- pnpm i
- pnpm build

Expected error:

```
api:build: webpack 5.74.0 compiled with 1 error in 2833 ms
api:build: D:\00 SOFTWARE\TEMP\turborepo-nestjs\packages\nest-config\src\index.ts:1
api:build: export * from "./config.service";
api:build: ^^^^^^
api:build:
api:build: SyntaxError: Unexpected token 'export'
api:build:     at Object.compileFunction (node:vm:352:18)
```
