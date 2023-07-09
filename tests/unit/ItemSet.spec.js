import { shallowMount } from '@vue/test-utils'
import ItemSet from "@/components/ItemSet.vue";
import Champions from "@/components/Champions.vue";
import Items from "@/components/Items.vue";

describe('ItemSet', () => {
    it('renders ItemSet', () => {

        const wrapper = shallowMount(ItemSet,{

        })
        const champions = wrapper.findComponent(Champions)
        const items = wrapper.findComponent(Items)
        expect(champions.exists() && items.exists()).toBeTruthy();

    })
})
