import { shallowMount } from '@vue/test-utils'
import ItemSetsView from '@/views/ItemSetsView.vue'
import ItemSet from "@/components/ItemSet.vue";

describe('ItemSetsView', () => {
    it('renders ItemSet', () => {

        const wrapper = shallowMount(ItemSetsView,{
            props: {ItemSet}
        })
        const set = wrapper.findComponent(ItemSet)
        expect(set.exists()).toBeTruthy()

    })
})
