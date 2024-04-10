# Arcdash

<div>
  <h3 align="center">
    Business Function Library - Modern, Simple, Typed, and Powerful
  </h3>
</div>

<p align="center">
  <a href="https://bundlephobia.com/package/arcdash">
    <img src="https://img.shields.io/bundlephobia/minzip/arcdash?label=minzipped" alt="bundle size" height="18">
  </a>
  <a href="https://www.npmjs.com/package/arcdash">
    <img src="https://img.shields.io/npm/dm/arcdash.svg" alt="npm downloads" height="18">
  </a>
  <a href="https://www.npmjs.com/package/arcdash">
    <img src="https://img.shields.io/npm/v/arcdash.svg" alt="npm version" height="18">
  </a>
  <a href="https://github.com/rayepps/arcdash">
    <img src="https://img.shields.io/npm/l/arcdash.svg" alt="MIT license" height="18">
  </a>
</p>

## Introduction
In order to meet the use of basic functions on the basis of focusing on the content of the business function, there is any need to lack of missing functions welcome to exchange!

## Install

```
use npm:
npm install arcdash

use yarn:
yarn add arcdash

use pnpm:
pnpm add radash

```

## Usage

```ts
import { joinValues, sum } from 'arcash';

joinValues([],'-') // => ''
joinValues(['a', null, 'b', undefined, 'c'], '-') // => a-b-c

const list = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
const result = sum(list, x => x.value) // => 22

```
