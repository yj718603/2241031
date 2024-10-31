<template>
  <div class="home-nav-right">
    <div>多语言:{{$t("hello")}} </div>
    <div data-v-7a8506e6="" class="tools-list">
      <div data-v-7a8506e6="" class="tools-list-item">
        <div data-v-7a8506e6="" id="gitcode-desk-btn" class="home-nav-item"><img data-v-7a8506e6=""
                                                                                 class="inline-block h-[20px] w-[20px]"
                                                                                 src="https://cdn-static.gitcode.com/static/images/desk/plane-online-service-hover.png"
                                                                                 alt=""></div>
      </div>
      <a data-v-7a8506e6="" class="home-nav-link tools-list-item" href="mailto:kefu@gitcode.com">
        <div data-v-7a8506e6="" class="home-nav-item"><img data-v-7a8506e6=""
                                                           class="common-icon inline-block h-[20px] w-[20px]"
                                                           src="https://cdn-static.gitcode.com/static/images/desk/plane-organize-entry.png"
                                                           alt=""><img data-v-7a8506e6=""
                                                                       class="active-icon inline-block h-[20px] w-[20px]"
                                                                       src="https://cdn-static.gitcode.com/static/images/desk/plane-organize-entry-hover.png"
                                                                       alt=""></div>
      </a>
      <div data-v-7a8506e6="" class="tools-list-item">
        <div data-v-7a8506e6="" class="home-nav-item"><img data-v-7a8506e6=""
                                                           class="common-icon inline-block h-[20px] w-[20px]"
                                                           src="https://cdn-static.gitcode.com/static/images/desk/plane-smile.png"
                                                           alt=""><img data-v-7a8506e6=""
                                                                       class="active-icon inline-block h-[20px] w-[20px]"
                                                                       src="https://cdn-static.gitcode.com/static/images/desk/plane-smile-hover.png"
                                                                       alt=""></div>
      </div>
    </div>
    <a data-v-7a8506e6="" class="home-nav-link tools-questionnaire" href="https://wj.qq.com/s2/15408956/ce55/"
       target="_blank" rel="noopener noreferrer">
      <div data-v-7a8506e6="" class="home-nav-item">
        <svg data-v-1df6fa24="" data-v-7a8506e6="" class="icon gt-icon home-nav-icon" aria-hidden="true"
             style="--630ee852: 20px; --008c0366: var(--theme-icon-fill-weak); --1121ebb1: 0deg;">
          <use data-v-1df6fa24="" xlink:href="#gt-a-plane-questionnaireinvestigation"></use>
        </svg>
      </div>
    </a>
  </div>
</template>

<script>
    export default {
        name: "demo"
    }
</script>

<style scoped>
  .home-nav-right {
    position: fixed;
    right: 16px;
    bottom: 64px;
    z-index: 20;
    display: flex;
    flex-direction: column;
  }

  .home-nav-right .tools-list {
    margin-top: 10px;
    margin-left: auto;
    padding: 6px 0;
    border-radius: 48px;
    background: var(--theme-home-tools-bg, #ffffff);
    box-shadow: 0 8px 24px #0000001f;
  }

  .tools-list-item {
    padding: 0 6px;
    border-radius: 50%;
  }

  .home-nav-right .home-nav-item {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    text-align: center;
    line-height: 33px;
  }
</style>
