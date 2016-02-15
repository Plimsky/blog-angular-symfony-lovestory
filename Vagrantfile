# -*- mode: ruby -*-
# vi: set ft=ruby :

############################### SCRIPT ###############################
$scriptCommun = <<SCRIPT

echo "[Common] Update system..."
        apt-get update -y
        apt-get upgrade -y
        apt-get install -y -f vim nano wget curl htop telnet rsync lynx emacs

    echo "[Apache/PHP/Mysql] Install..."
        echo mysql-server mysql-server/root_password password root | sudo debconf-set-selections
        echo mysql-server mysql-server/root_password_again password root | sudo debconf-set-selections

        #Apache
        apt-get install -y -f apache2-mpm-prefork
        #MySQL
        apt-get install -y -f mysql-server
        #PHP
        apt-get install php5-common -y -f
        apt-get install php5-cli -y -f
        apt-get install php5-dev -y -f
        apt-get install php5-curl -y -f
        apt-get install php5-gd -y -f
        apt-get install php5-intl -y -f
        apt-get install php5-mcrypt -y -f
        apt-get install php5-mysql -y -f
        apt-get install php5-readline -y -f
        apt-get install libapache2-mod-php5 -y -f
        apt-get install php5-xdebug -y -f
        #Others
        apt-get install -y -f

    echo "[Composer] Prepare..."
        curl -sS https://getcomposer.org/installer | php
        mv composer.phar /usr/local/bin/composer

    echo "[Symfony] Prepare..."
        curl -LsS http://symfony.com/installer -o /usr/local/bin/symfony
        chmod a+x /usr/local/bin/symfony

    echo "[NodeJs] Prepare..."
            curl -sL https://deb.nodesource.com/setup_5.x | bash -
            apt-get install -y nodejs
            npm cache clean
            npm install npm -g
            npm cache clean

    echo "[AngularJs] Prepare..."
        apt-get install -y -f --force-yes git libpng-dev libfontconfig
        npm install -g yo --unsafe-perm
        npm install -g gulp
        npm install -g bower --save-dev
        npm install -g generator-gulp-angular --save-dev
        npm cache clean

SCRIPT


############################### SCRIPT ###############################
$scriptConf = <<SCRIPT

echo "[Profile] Configuration..."
    echo "cd /var/www/" >> /home/vagrant/.bash_profile

echo "[Apache/PHP/Mysql] Configuration..."
    sed -i 's#;date.timezone =#date.timezone = Europe/Paris#g' /etc/php5/apache2/php.ini
    sed -i 's#;date.timezone =#date.timezone = Europe/Paris#g' /etc/php5/cli/php.ini

    sed -i 's/export APACHE_RUN_USER=www-data/export APACHE_RUN_USER=vagrant/g' /etc/apache2/envvars
    sed -i 's/export APACHE_RUN_GROUP=www-data/export APACHE_RUN_GROUP=vagrant/g' /etc/apache2/envvars

    echo 'Europe/Paris' > /etc/timezone
    sudo dpkg-reconfigure --frontend noninteractive tzdata

    a2enmod php5 rewrite
    a2enmod headers
    service apache2 restart

echo "
# If you just change the port or add more ports here, you will likely also
# have to change the VirtualHost statement in
# /etc/apache2/sites-enabled/000-default
# This is also true if you have upgraded from before 2.2.9-3 (i.e. from
# Debian etch). See /usr/share/doc/apache2.2-common/NEWS.Debian.gz and
# README.Debian.gz

Listen 80
Listen 8089

<IfModule mod_ssl.c>
# If you add NameVirtualHost *:443 here, you will also have to change
# the VirtualHost statement in /etc/apache2/sites-available/default-ssl
# to <VirtualHost *:443>
# Server Name Indication for SSL named virtual hosts is currently not
# supported by MSIE on Windows XP.
Listen 443
</IfModule>

<IfModule mod_gnutls.c>
Listen 443
</IfModule>
"  > /etc/apache2/ports.conf

echo "
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ProxyPreserveHost on
    ProxyPass /api http://127.0.0.1:8089
    DocumentRoot /var/www/Front/dist
    <Directory /var/www/Front/dist>
        Options FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>

    ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
    <Directory /usr/lib/cgi-bin>
        AllowOverride All
        Options ExecCGI SymLinksIfOwnerMatch
        Require all granted
    </Directory>

    ErrorLog /var/log/apache2/error.log
    LogLevel warn
    CustomLog /var/log/apache2/access.log combined
</VirtualHost>

<VirtualHost *:8089>
    DocumentRoot /var/www/Back/web
    <Directory /var/www/Back/web>
        AllowOverride All
        Require all granted
        Options FollowSymLinks MultiViews
    </Directory>
    ErrorLog /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined
</VirtualHost>

" > /etc/apache2/sites-available/default.conf

    a2dissite 000-default.conf
    a2ensite default.conf
    a2enmod proxy
    a2enmod proxy_connect
    a2enmod proxy_http
    service apache2 restart

echo "[Xdebug] Configuration..."
    php5dismod xdebug
    service apache2 stop
    rmdir /var/lock/apache2
    service apache2 start

echo "[Hosts] Test..."
sed -i -e '1i 127.0.0.1 test.local\' /etc/hosts

SCRIPT


Vagrant.configure(2) do |config|

    config.vm.box = "debian/jessie64"
    config.vm.provision "shell", inline: $scriptCommun
    config.vm.provision "shell", inline: $scriptConf

    config.ssh.username = "vagrant"
    config.ssh.password = "vagrant"

    config.vm.provider "virtualbox" do |vb|
        vb.memory=2048
        vb.cpus=2
    end

    ####################################
    # DEV
    ####################################

    config.vm.define "dev" do |dev|
        dev.vm.network "private_network", ip: "10.0.65.2"
        dev.vm.synced_folder ".", "/var/www/"
    end

    config.vm.define "devwin" do |devwin|
        devwin.vm.network "private_network", ip: "10.0.65.2"
        devwin.vm.synced_folder ".", "/var/www/", type: "rsync",
            rsync__exclude: [
                ".git/",
                "Back/app/cache",
                "Back/app/logs",
                "Back/build",
                "Back/web/bundles/*",
                "Front/node_modules/.bin",
                "Front/.tmp"
            ],
            rsync__args: [
                "--verbose",
                "--archive",
                "--delete",
                "-z"
            ],
            rsync__auto: true
    end

    config.vm.define "devosx" do |devosx|
        devosx.vm.network "private_network", ip: "10.0.65.2"
        devosx.vm.synced_folder ".", "/var/www/", type: "nfs", mount_options: ['actimeo=1']
    end
end
