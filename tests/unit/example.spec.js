import { shallowMount } from '@vue/test-utils'
import Instruction from '@/components/Instruction.vue'

describe('Instruction.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Instruction of how to use the Item Set Creator'
    const wrapper = shallowMount(Instruction, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
