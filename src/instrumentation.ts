export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    process.on('unhandledRejection', (reason) => {
      console.error('[process] Unhandled promise rejection:', reason);
    });
    process.on('uncaughtException', (error) => {
      console.error('[process] Uncaught exception:', error);
    });
  }
}
