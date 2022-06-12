import os from 'os';

export const cpu = () => {
  console.log(`Overall amount of CPUS:${os.cpus().length}`);
  console.log(
    os.cpus().map(cpu => {
      return { model: cpu.model, speed: `${cpu.speed / 1000} GHz` };
    }),
  );
};

