import * as imports from './imports'

export const getNuxt = async function getNuxt(options) {
  const { Nuxt } = await imports.core()
  const nuxt = new Nuxt(options)
  await nuxt.ready()
  return nuxt
}

export const getBuilder = async function getBuilder(nuxt) {
  const { Builder } = await imports.builder()
  const { BundleBuilder } = await imports.webpack()
  return new Builder(nuxt, BundleBuilder)
}

export const getGenerator = async function getGenerator(nuxt) {
  const { Generator } = await imports.generator()
  const builder = await getBuilder(nuxt)
  return new Generator(nuxt, builder)
}
