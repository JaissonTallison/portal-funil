#!/usr/bin/env tsx
/**
 * PortalFunil — Reset administrativo de senha
 * Uso: pnpm user:reset-password <email> [nova-senha]
 *   Se nova-senha for omitida, gera uma senha aleatória segura.
 */
import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as readline from 'readline';

const prisma = new PrismaClient();

function generatePassword(length = 16): string {
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%';
  return Array.from(crypto.randomBytes(length))
    .map((b) => chars[b % chars.length])
    .join('');
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (ans) => { rl.close(); resolve(ans); }));
}

async function main() {
  const args = process.argv.slice(2);
  const email = args[0];

  if (!email) {
    console.error('✗ Uso: pnpm user:reset-password <email> [nova-senha]');
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`✗ Usuário não encontrado: ${email}`);
    process.exit(1);
  }

  console.log(`\n  Usuário: ${user.name} (${user.email})`);
  console.log(`  Role:    ${user.role}`);
  console.log(`  ID:      ${user.id}\n`);

  let newPassword = args[1];

  if (!newPassword) {
    const choice = await prompt('  Definir senha manualmente? [s/N]: ');
    if (choice.toLowerCase() === 's') {
      newPassword = await prompt('  Nova senha (mínimo 8 caracteres): ');
      if (newPassword.length < 8) {
        console.error('✗ Senha muito curta (mínimo 8 caracteres).');
        process.exit(1);
      }
    } else {
      newPassword = generatePassword();
      console.log(`\n  Senha gerada automaticamente.`);
    }
  }

  const confirm = await prompt('\n  Confirma o reset de senha? [s/N]: ');
  if (confirm.toLowerCase() !== 's') {
    console.log('✗ Operação cancelada.');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    }),
    prisma.auditLog.create({
      data: {
        userId: user.id,
        userEmail: user.email,
        action: 'PASSWORD_RESET',
        entity: 'User',
        entityId: user.id,
        details: { resetBy: 'CLI_ADMIN', timestamp: new Date().toISOString() },
        ip: 'cli',
      },
    }),
  ]);

  console.log('\n✓ Senha redefinida com sucesso.');
  console.log(`  Usuário: ${user.email}`);
  console.log(`  Nova senha: ${newPassword}`);
  console.log('\n  ⚠️  Guarde esta senha em local seguro. Ela não será exibida novamente.');
  console.log('  ⚠️  Peça ao usuário que a troque no próximo acesso.\n');
}

main()
  .catch((e) => { console.error('✗ Erro:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
