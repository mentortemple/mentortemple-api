@servers(['apis' => ['root@207.154.225.174']])

@php
  $repo = "git@mentortemple-api.github.com:mentortemple/mentortemple-api.git";
  $releaseDir = '/opt/mentortemple-api/releases';
  $appDir = '/opt/mentortemple-api';
  $envVariables = file_get_contents('.env.prod');
  $release = 'release_' . date('Y-m-d-H-i');
@endphp

@macro('deploy', ['on' => 'apis'])
  fetch_repo
  run_npm_install
  update_permissions
  setup_env
  restart_pm2
@endmacro

@task('fetch_repo')
  [ -d {{ $releaseDir }} ] || mkdir -p {{ $releaseDir }};
  cd {{ $releaseDir }};
  git clone {{ $repo }} {{ $release }};
@endtask

@task('run_npm_install')
  cd {{ $releaseDir }}/{{ $release }};
  rm package-lock.json;
  npm install --production;
  npm run postinstall;
@endtask

@task('update_permissions')
  sudo chmod -R 777 {{ $releaseDir }}/{{ $release }}/public;
@endtask

@task('setup_env')
  cd {{ $releaseDir }}/{{ $release }};
  touch .env
  echo "{{ $envVariables }}" >> .env
@endtask

@task('restart_pm2')
  pm2 delete 'mentortemple-api' || true;
  cd {{ $releaseDir }}/{{ $release }};
  NODE_ENV=production pm2 start server.js --name mentortemple-api
@endtask
