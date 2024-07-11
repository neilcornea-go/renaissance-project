<script setup>
import { ref } from 'vue';
import GlobalLayout from '../components/structure/layout.vue';
import StepIndicator from '../components/common/step.vue';
import Title from '../components/common/title.vue';
import Subtitle from '../components/common/subtitle.vue';
import Divider from '../components/common/divider.vue';

// Form Input Components
import InputText from '../components/form/input-text.vue';
import InputDate from '../components/form/input-date.vue';
import Dropdown from '../components/form/dropdown.vue';
import Checkbox from '../components/form/checkbox.vue';

</script>

<template>
    <GlobalLayout>
        <section class="flex flex-col gap-8">
            <!-- Steps Indicator -->
            <div class="space-y-2">
                <StepIndicator step="3" />
                <f7-progressbar color="blue" :progress="10" />
                <Title title="Verify Claim Details" />
                <Subtitle
                    subtitle="Kindly check and verify that the details are accurate or you can click to edit the details." />
            </div>

            <!-- Edit Document Details -->
            <div>
                <f7-toolbar bottom tabbar>
                    <f7-link tab-link="#tab-1" tab-link-active>Tab 1</f7-link>
                    <f7-link tab-link="#tab-2">Tab 2</f7-link>
                    <f7-link tab-link="#tab-3">Tab 3</f7-link>
                </f7-toolbar>

                <f7-tabs animated>
                    <f7-tab id="tab-1" class="page-content" tab-active>
                        <f7-block>
                            <p>Tab 1 content</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae
                                facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo
                                suscipit temporibus sequi iure ad laboriosam accusamus?
                            </p>
                            <p>
                                Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit
                                blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed,
                                sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur
                                deleniti.
                            </p>
                            <p>
                                Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque,
                                est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde
                                delectus a maiores nihil dolores? Natus, perferendis.
                            </p>
                            <p>
                                Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur
                                perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime
                                ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!
                            </p>
                            <p>
                                Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus
                                ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia
                                explicabo, unde aliquid impedit! Adipisci!
                            </p>
                            <p>
                                Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste
                                fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro
                                accusantium, officiis veniam nostrum cum cumque impedit.
                            </p>
                            <p>
                                Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad
                                praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque
                                provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.
                            </p>
                        </f7-block>
                    </f7-tab>
                    <f7-tab id="tab-2" class="page-content">
                        <f7-block>
                            <p>Tab 2 content</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae
                                facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo
                                suscipit temporibus sequi iure ad laboriosam accusamus?
                            </p>
                            <p>
                                Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit
                                blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed,
                                sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur
                                deleniti.
                            </p>
                            <p>
                                Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque,
                                est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde
                                delectus a maiores nihil dolores? Natus, perferendis.
                            </p>
                            <p>
                                Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur
                                perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime
                                ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!
                            </p>
                            <p>
                                Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus
                                ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia
                                explicabo, unde aliquid impedit! Adipisci!
                            </p>
                            <p>
                                Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste
                                fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro
                                accusantium, officiis veniam nostrum cum cumque impedit.
                            </p>
                            <p>
                                Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad
                                praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque
                                provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.
                            </p>
                        </f7-block>
                    </f7-tab>
                    <f7-tab id="tab-3" class="page-content">
                        <f7-block>
                            <p>Tab 3 content</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae
                                facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo
                                suscipit temporibus sequi iure ad laboriosam accusamus?
                            </p>
                            <p>
                                Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit
                                blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed,
                                sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur
                                deleniti.
                            </p>
                            <p>
                                Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque,
                                est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde
                                delectus a maiores nihil dolores? Natus, perferendis.
                            </p>
                            <p>
                                Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur
                                perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime
                                ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!
                            </p>
                            <p>
                                Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus
                                ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia
                                explicabo, unde aliquid impedit! Adipisci!
                            </p>
                            <p>
                                Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste
                                fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro
                                accusantium, officiis veniam nostrum cum cumque impedit.
                            </p>
                            <p>
                                Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad
                                praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque
                                provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.
                            </p>
                        </f7-block>
                    </f7-tab>
                </f7-tabs>
            </div>
        </section>
    </GlobalLayout>
</template>

<style scoped>
.progressbar {
    height: 7px;
    border-radius: 10px;
}
</style>