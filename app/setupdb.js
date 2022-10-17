'use strict'

const configdb = require('./config/index')
const db = require('./components/migrations/createmodels')
const inquirer = require('inquirer')

const prompt = inquirer.createPromptModule()

async function connectionDB () {
  const question = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'This will destroy your database, are you sure?'
  })

  if (!question.setup) {
    return console.log('Nothing happend')
  }

  const config = {
    host: configdb.config.local.host,
    database: configdb.config.local.namedb,
    user: configdb.config.local.user,
    pass: configdb.config.local.pass,
    dialect: configdb.config.local.dialect,
    setup: true
  }

  await db(config)

  console.log('Create ok!!')
  process.exit(1)
}

setTimeout(() => {
  connectionDB()
}, 1000)
