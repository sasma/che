/*
 * Copyright (c) 2015-2017 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

/**
 * This class is handling the service for the Git project import.
 *
 * @author Oleksii Kurinnyi
 */
export class ImportGitProjectService {
  /**
   * Git project location.
   */
  private _location: string;

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor() {
    this._location = '';
  }

  get location(): string {
    return this._location;
  }

  /**
   * Callback which is called when location is changed.
   *
   * @param {string=""} location
   */
  onLocationChanged(location: string = ''): void {
    this._location = location;
  }

  /**
   * Returns project's properties.
   *
   * @return {che.IProjectTemplate}
   */
  getProjectProps(): che.IProjectTemplate {
    const props = {} as che.IProjectTemplate;
    const [ , name] = /.*\/([^.]+)(\.git?|$)/i.exec(this._location);
    const path = '/' +  name.replace(/[^\w-_]/g, '_');
    props.name = name;
    props.displayName = name;
    props.description = '';
    props.path = path;
    props.category = '';

    props.source = {
      type: 'git',
      location: this._location
    };

    return props;
  }

}
