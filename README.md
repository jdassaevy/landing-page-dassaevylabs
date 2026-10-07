# Dassaevy Labs — Landing Page

Landing comercial premium da Dassaevy Labs, construída com Next.js, TypeScript, Tailwind CSS e Motion for React.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha os valores reais. Segredos do Resend nunca devem usar prefixo `NEXT_PUBLIC_`.

## Qualidade

```bash
npm run test:run
npm run test:e2e
npm run lint
npm run typecheck
npm run build
```

Antes de produção:

```bash
npm run verify:production
```

O gate exige contato/domínio reais, logo, foto profissional e imagem real do case publicado. Cases sem material real devem permanecer como `draft`.

## Motion

O projeto segue `kylezantos/design-motion-principles`: Jakub Krehel como lente principal, Jhey Tompkins como secundária e Emil Kowalski seletivamente em navegação/formulários. Todo motion respeita `prefers-reduced-motion`.
