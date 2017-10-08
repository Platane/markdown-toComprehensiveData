import { parse } from '../index'
import { toString } from '../utils'
import fs from 'fs'
import path from 'path'

fs
    .readdirSync(path.join(__dirname, './samples'))
    .forEach(filename =>
        it(`should parse the file "${filename}"`, () =>
            expect(
                toString(
                    parse(
                        fs
                            .readFileSync(
                                path.join(__dirname, './samples', filename)
                            )
                            .toString()
                    )
                )
            ).toMatchSnapshot())
    )
