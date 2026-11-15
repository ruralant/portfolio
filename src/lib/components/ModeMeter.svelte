<!--
  Bars lit by the mode stamped on <html>: three in full, two in balanced, one in lean. CSS reads
  the attribute, so the meter is right from the first paint, before any script runs.
-->
<span aria-hidden="true" class="flex h-2.5 shrink-0 items-end gap-0.5">
  <span class="bg-accent h-[40%] w-1 rounded-[1px]"></span>
  <span class="bg-accent lean:bg-line-strong h-[70%] w-1 rounded-[1px]"></span>
  <span class="bg-accent balanced:bg-line-strong lean:bg-line-strong h-full w-1 rounded-[1px]"
  ></span>
</span>
