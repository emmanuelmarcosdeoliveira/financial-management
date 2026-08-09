## Requisitos Funcionais

- [x] O usuário deve poder criar uma transação;
- [x] O usuário deve poder obter um resumo da conta
- [x] o usuário deve poder listar todas as transações que já ocorreram
- [x] o usuário deve poder visualizar uma transação única

## Regras de negócio

- [x] A transação deve ser de crédito que somará ao valor total
- [ ] A transação pode ser do tipo débito subtrairá do valor total
- [ ] Deve ser possível identificarmos o usuário entre as requisições
- [ ] O usuário só pode visualizar transações o qual ele criou

## Requisitos não funcionais

`O que compõe as transactions:`

id: number
title: string
type: 'income' | 'outcome'
price: number
category: string
createAt: string
