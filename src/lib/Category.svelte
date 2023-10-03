<script lang="ts">
  let isDropDownOpen = false;

  const handleDropdownClick = () => {
    isDropDownOpen = !isDropDownOpen;
  };

  const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }: any) => {
    console.log(relatedTarget);
    if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
    isDropDownOpen = false;
  };
</script>

<div class="container mx-auto flex items-center">
  <div class="dropdown relative inline-block" on:focusout={handleDropdownFocusLoss}>
    <button class="btn rounded-md ps-0" on:click={handleDropdownClick}>
      <svg
        class="fill-current mr-1"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        x="0"
        y="0"
        viewBox="0 0 60.123 60.123"
        style="enable-background:new 0 0 512 512"
        xml:space="preserve"
      >
        <g>
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M57.124,51.893H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,51.893,57.124,51.893z"
            />
            <path
              d="M57.124,33.062H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3   C60.124,31.719,58.781,33.062,57.124,33.062z"
            />
            <path
              d="M57.124,14.231H16.92c-1.657,0-3-1.343-3-3s1.343-3,3-3h40.203c1.657,0,3,1.343,3,3S58.781,14.231,57.124,14.231z"
            />
            <circle cx="4.029" cy="11.463" r="4.029" /><circle cx="4.029" cy="30.062" r="4.029" />
            <circle cx="4.029" cy="48.661" r="4.029" /></g
          >
        </g>
      </svg>
      <span>Danh mục sản phẩm</span>
    </button>
    <div
      class="category-dropdown absolute w-full bg-surface-100-800-token rounded-b"
      style:visibility={isDropDownOpen ? 'visible' : 'hidden'}
    >
      <a class="btn w-full" href="/danh-muc-san-pham/1">Laptop</a>
    </div>
  </div>
  <div class="inline-block ml-3 items-center p-3">
    <div class="inline-flex items-center gap-1">
      <img
        class="w-4 h-4 invert-0 dark:invert"
        src="//theme.hstatic.net/200000637319/1000990988/14/header_03_policy_1_ico.png?v=367"
        alt=""
      />
      <span>Đảm bảo chất lượng</span>
    </div>
    <div class="inline-flex items-center gap-1">
      <img
        class="w-4 h-4 invert-0 dark:invert"
        src="//theme.hstatic.net/200000637319/1000990988/14/header_03_policy_2_ico.png?v=367"
        alt=""
      />
      <span>Hỗ trợ trả góp</span>
    </div>
    <div class="inline-flex items-center gap-1">
      <img
        class="w-4 h-4 invert-0 dark:invert"
        src="//theme.hstatic.net/200000637319/1000990988/14/header_03_policy_3_ico.png?v=367"
        alt=""
      />
      <span>Miễn phí vận chuyển nội thành Đồng Nai</span>
    </div>
  </div>
</div>
