import { shallowMount } from '@vue/test-utils'
import HomeView from "@/views/HomeView.vue";
import Instruction from "@/components/Instruction.vue";

describe('HomeView', () => {
    it('renders ItemSet', () => {

        const wrapper = shallowMount(HomeView,{
            props: {Instruction}
        })
        const instr = wrapper.findComponent(Instruction)
        expect(instr.exists()).toBeTruthy()

    })
})
