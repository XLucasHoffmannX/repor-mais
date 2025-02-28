export function useAnimationLottie(file: unknown, loop?: boolean) {
  return {
    loop: loop,
    autoplay: true,
    animationData: file,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
}
