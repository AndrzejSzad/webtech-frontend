import { shallowMount } from '@vue/test-utils'
import Champions from '@/components/Champions.vue'

describe('Instruction.vue', () => {
    it('renders props.msg when passed', () => {

        expect(wrapper.text()).toMatch(msg)
    })
})